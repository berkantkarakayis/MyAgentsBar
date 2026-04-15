import Foundation

// Temporary stubs for providers removed from this fork.
// They keep compile-time references intact while those providers remain disabled.

public struct ZaiUsageDetail: Codable, Sendable {
    public let modelCode: String
    public let usage: Int

    public init(modelCode: String = "", usage: Int = 0) {
        self.modelCode = modelCode
        self.usage = usage
    }
}

public struct ZaiLimitEntry: Codable, Sendable {
    public let currentValue: Int?
    public let usage: Int?
    public let remaining: Int?
    public let usageDetails: [ZaiUsageDetail]
    public let windowLabel: String?
    public let nextResetTime: Date?

    public init(
        currentValue: Int? = nil,
        usage: Int? = nil,
        remaining: Int? = nil,
        usageDetails: [ZaiUsageDetail] = [],
        windowLabel: String? = nil,
        nextResetTime: Date? = nil)
    {
        self.currentValue = currentValue
        self.usage = usage
        self.remaining = remaining
        self.usageDetails = usageDetails
        self.windowLabel = windowLabel
        self.nextResetTime = nextResetTime
    }
}

public struct ZaiUsageSnapshot: Codable, Sendable {
    public let tokenLimit: ZaiLimitEntry?
    public let timeLimit: ZaiLimitEntry?
    public let sessionTokenLimit: ZaiLimitEntry?

    public init(
        tokenLimit: ZaiLimitEntry? = nil,
        timeLimit: ZaiLimitEntry? = nil,
        sessionTokenLimit: ZaiLimitEntry? = nil)
    {
        self.tokenLimit = tokenLimit
        self.timeLimit = timeLimit
        self.sessionTokenLimit = sessionTokenLimit
    }
}

public struct MiniMaxUsageSnapshot: Codable, Sendable {}

public enum OpenRouterKeyQuotaStatus: String, Codable, Sendable {
    case noLimitConfigured
    case available
    case unavailable
}

public struct OpenRouterUsageSnapshot: Codable, Sendable {
    public let hasValidKeyQuota: Bool
    public let keyRemaining: Double?
    public let keyLimit: Double?
    public let keyQuotaStatus: OpenRouterKeyQuotaStatus

    public init(
        hasValidKeyQuota: Bool = false,
        keyRemaining: Double? = nil,
        keyLimit: Double? = nil,
        keyQuotaStatus: OpenRouterKeyQuotaStatus = .noLimitConfigured)
    {
        self.hasValidKeyQuota = hasValidKeyQuota
        self.keyRemaining = keyRemaining
        self.keyLimit = keyLimit
        self.keyQuotaStatus = keyQuotaStatus
    }
}

public enum ZaiAPIRegion: String, Codable, Sendable {
    case global
    case unknown
}

public enum MiniMaxAPIRegion: String, Codable, Sendable {
    case global
    case unknown
}

public enum AlibabaCodingPlanAPIRegion: String, Codable, Sendable {
    case international
    case unknown

    public var dashboardURL: URL? {
        URL(string: "https://berkant.vercel.app/#home")
    }
}

public enum KiloUsageDataSource: String, Codable, Sendable, CaseIterable {
    case auto
    case cookies
    case api
    case cli
}

public enum ZaiSettingsReader {
    public static let apiTokenKey = "Z_AI_API_KEY"
    public static func apiToken(environment: [String: String] = ProcessInfo.processInfo.environment) -> String? {
        environment[apiTokenKey]
    }
}

public enum MiniMaxAPISettingsReader {
    public static let apiTokenKey = "MINIMAX_API_KEY"
    public static func apiToken(environment: [String: String] = ProcessInfo.processInfo.environment) -> String? {
        environment[apiTokenKey]
    }
}

public enum AlibabaCodingPlanSettingsReader {
    public static let apiTokenKey = "ALIBABA_CODING_PLAN_API_KEY"
    public static func apiToken(environment: [String: String] = ProcessInfo.processInfo.environment) -> String? {
        environment[apiTokenKey]
    }
}

public enum KiloSettingsReader {
    public static let apiTokenKey = "KILO_API_KEY"
    public static let apiKeyEnvironmentKeys = [apiTokenKey]
    public static func apiKey(environment: [String: String] = ProcessInfo.processInfo.environment) -> String? {
        environment[apiTokenKey]
    }
    public static func authToken(authFileURL _: URL? = nil) -> String? { nil }
}

public enum KimiK2SettingsReader {
    public static let apiKeyEnvironmentKeys = ["KIMIK2_API_KEY"]
    public static func apiKey(environment: [String: String] = ProcessInfo.processInfo.environment) -> String? {
        apiKeyEnvironmentKeys.compactMap { environment[$0] }.first
    }
}

public enum SyntheticSettingsReader {
    public static let apiKeyKey = "SYNTHETIC_API_KEY"
    public static func apiKey(environment: [String: String] = ProcessInfo.processInfo.environment) -> String? {
        environment[apiKeyKey]
    }
}

public enum WarpSettingsReader {
    public static let apiKeyEnvironmentKeys = ["WARP_API_KEY"]
    public static func apiKey(environment: [String: String] = ProcessInfo.processInfo.environment) -> String? {
        apiKeyEnvironmentKeys.compactMap { environment[$0] }.first
    }
}

public enum OpenRouterSettingsReader {
    public static let envKey = "OPENROUTER_API_KEY"
    public static func apiToken(environment: [String: String] = ProcessInfo.processInfo.environment) -> String? {
        environment[envKey]
    }
}

public enum PerplexitySettingsReader {
    public static func sessionToken(environment: [String: String] = ProcessInfo.processInfo.environment) -> String? {
        environment["PERPLEXITY_SESSION_TOKEN"]
    }
}

public enum PerplexityCookieImporter {
    public struct Session: Sendable {
        public let sessionToken: String?
        public init(sessionToken: String? = nil) {
            self.sessionToken = sessionToken
        }
    }

    public static func importSession() throws -> Session {
        Session()
    }
}

public struct AntigravityPlanInfoSummary: Codable, Sendable {
    public let planName: String?
    public let planDisplayName: String?
    public let displayName: String?
    public let productName: String?
    public let planShortName: String?

    public init(
        planName: String? = nil,
        planDisplayName: String? = nil,
        displayName: String? = nil,
        productName: String? = nil,
        planShortName: String? = nil)
    {
        self.planName = planName
        self.planDisplayName = planDisplayName
        self.displayName = displayName
        self.productName = productName
        self.planShortName = planShortName
    }
}

public struct AntigravityStatusProbe: Sendable {
    public init() {}
    public static func isRunning() async -> Bool { false }
    public func fetchPlanInfoSummary() async throws -> AntigravityPlanInfoSummary {
        AntigravityPlanInfoSummary()
    }
}

public struct AugmentStatusProbe {
    public init() {}
    public func debugRawProbe() async -> String { "" }
    public static func latestDumps() async -> String {
        ""
    }
}

public struct AmpUsageFetcher {
    public init(browserDetection _: BrowserDetection) {}
    public func debugRawProbe(cookieHeaderOverride _: String?) async -> String { "" }
}

public struct OllamaUsageFetcher {
    public init(browserDetection _: BrowserDetection) {}
    public func debugRawProbe(cookieHeaderOverride _: String?, manualCookieMode _: Bool) async -> String { "" }
}

public enum MiniMaxCookieHeader {
    public static func normalized(from raw: String) -> String? {
        let trimmed = raw.trimmingCharacters(in: .whitespacesAndNewlines)
        return trimmed.isEmpty ? nil : trimmed
    }
}

public enum SyntheticSettingsError: Error {
    case missingToken
    public var errorDescription: String? { "Missing synthetic token." }
}

public enum ZaiSettingsError: Error {
    case missingToken
    public var errorDescription: String? { "Missing z.ai token." }
}

public enum OpenRouterSettingsError: Error {
    case missingToken
    public var errorDescription: String? { "Missing OpenRouter token." }
}

public enum PerplexityAPIError: Error {
    case missingToken
    public var errorDescription: String? { "Missing Perplexity token." }
}

public enum MiniMaxAPISettingsError: Error {
    case missingToken
    public var errorDescription: String? { "Missing MiniMax token." }
}

public enum KimiAPIError: Error {
    case missingToken
    public var errorDescription: String? { "Missing Kimi token." }
}
