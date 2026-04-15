import Foundation

public enum MyAgentsBarConfigStoreError: LocalizedError {
    case invalidURL
    case decodeFailed(String)
    case encodeFailed(String)

    public var errorDescription: String? {
        switch self {
        case .invalidURL:
            "Invalid MyAgentsBar config path."
        case let .decodeFailed(details):
            "Failed to decode MyAgentsBar config: \(details)"
        case let .encodeFailed(details):
            "Failed to encode MyAgentsBar config: \(details)"
        }
    }
}

public struct MyAgentsBarConfigStore: @unchecked Sendable {
    public let fileURL: URL
    private let fileManager: FileManager

    public init(fileURL: URL = Self.defaultURL(), fileManager: FileManager = .default) {
        self.fileURL = fileURL
        self.fileManager = fileManager
    }

    public func load() throws -> MyAgentsBarConfig? {
        guard self.fileManager.fileExists(atPath: self.fileURL.path) else { return nil }
        let data = try Data(contentsOf: self.fileURL)
        let decoder = JSONDecoder()
        do {
            let decoded = try decoder.decode(MyAgentsBarConfig.self, from: data)
            return decoded.normalized()
        } catch {
            throw MyAgentsBarConfigStoreError.decodeFailed(error.localizedDescription)
        }
    }

    public func loadOrCreateDefault() throws -> MyAgentsBarConfig {
        if let existing = try self.load() {
            return existing
        }
        let config = MyAgentsBarConfig.makeDefault()
        try self.save(config)
        return config
    }

    public func save(_ config: MyAgentsBarConfig) throws {
        let normalized = config.normalized()
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
        let data: Data
        do {
            data = try encoder.encode(normalized)
        } catch {
            throw MyAgentsBarConfigStoreError.encodeFailed(error.localizedDescription)
        }
        let directory = self.fileURL.deletingLastPathComponent()
        if !self.fileManager.fileExists(atPath: directory.path) {
            try self.fileManager.createDirectory(at: directory, withIntermediateDirectories: true)
        }
        try data.write(to: self.fileURL, options: [.atomic])
        try self.applySecurePermissionsIfNeeded()
    }

    public func deleteIfPresent() throws {
        guard self.fileManager.fileExists(atPath: self.fileURL.path) else { return }
        try self.fileManager.removeItem(at: self.fileURL)
    }

    public static func defaultURL(home: URL = FileManager.default.homeDirectoryForCurrentUser) -> URL {
        home
            .appendingPathComponent(".myagentsbar", isDirectory: true)
            .appendingPathComponent("config.json")
    }

    private func applySecurePermissionsIfNeeded() throws {
        #if os(macOS) || os(Linux)
        try self.fileManager.setAttributes([
            .posixPermissions: NSNumber(value: Int16(0o600)),
        ], ofItemAtPath: self.fileURL.path)
        #endif
    }
}
