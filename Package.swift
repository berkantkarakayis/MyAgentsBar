// swift-tools-version: 6.2
import CompilerPluginSupport
import Foundation
import PackageDescription

let sweetCookieKitPath = "../SweetCookieKit"
let useLocalSweetCookieKit =
    ProcessInfo.processInfo.environment["CODEXBAR_USE_LOCAL_SWEETCOOKIEKIT"] == "1"
let sweetCookieKitDependency: Package.Dependency =
    useLocalSweetCookieKit && FileManager.default.fileExists(atPath: sweetCookieKitPath)
    ? .package(path: sweetCookieKitPath)
    : .package(url: "https://github.com/steipete/SweetCookieKit", from: "0.4.0")

let package = Package(
    name: "MyAgentsBar",
    platforms: [
        .macOS(.v14),
    ],
    dependencies: [
        .package(url: "https://github.com/sparkle-project/Sparkle", from: "2.8.1"),
        .package(url: "https://github.com/steipete/Commander", from: "0.2.1"),
        .package(url: "https://github.com/apple/swift-log", from: "1.9.1"),
        .package(url: "https://github.com/apple/swift-syntax", from: "600.0.1"),
        .package(url: "https://github.com/sindresorhus/KeyboardShortcuts", from: "2.4.0"),
        sweetCookieKitDependency,
    ],
    targets: {
        var targets: [Target] = [
            .target(
                name: "MyAgentsBarCore",
                dependencies: [
                    "MyAgentsBarMacroSupport",
                    .product(name: "Logging", package: "swift-log"),
                    .product(name: "SweetCookieKit", package: "SweetCookieKit"),
                ],
                swiftSettings: [
                    .enableUpcomingFeature("StrictConcurrency"),
                ]),
            .macro(
                name: "MyAgentsBarMacros",
                dependencies: [
                    .product(name: "SwiftCompilerPlugin", package: "swift-syntax"),
                    .product(name: "SwiftSyntaxBuilder", package: "swift-syntax"),
                    .product(name: "SwiftSyntaxMacros", package: "swift-syntax"),
                ]),
            .target(
                name: "MyAgentsBarMacroSupport",
                dependencies: [
                    "MyAgentsBarMacros",
                ]),
            .executableTarget(
                name: "MyAgentsBarCLI",
                dependencies: [
                    "MyAgentsBarCore",
                    .product(name: "Commander", package: "Commander"),
                ],
                path: "Sources/MyAgentsBarCLI",
                swiftSettings: [
                    .enableUpcomingFeature("StrictConcurrency"),
                ]),
            .testTarget(
                name: "MyAgentsBarLinuxTests",
                dependencies: ["MyAgentsBarCore", "MyAgentsBarCLI"],
                path: "TestsLinux",
                swiftSettings: [
                    .enableUpcomingFeature("StrictConcurrency"),
                    .enableExperimentalFeature("SwiftTesting"),
                ]),
        ]

        #if os(macOS)
        targets.append(contentsOf: [
            .executableTarget(
                name: "MyAgentsBarClaudeWatchdog",
                dependencies: [],
                path: "Sources/MyAgentsBarClaudeWatchdog",
                swiftSettings: [
                    .enableUpcomingFeature("StrictConcurrency"),
                ]),
            .executableTarget(
                name: "MyAgentsBar",
                dependencies: [
                    .product(name: "Sparkle", package: "Sparkle"),
                    .product(name: "KeyboardShortcuts", package: "KeyboardShortcuts"),
                    "MyAgentsBarMacroSupport",
                    "MyAgentsBarCore",
                ],
                path: "Sources/MyAgentsBar",
                resources: [
                    .process("Resources"),
                ],
                swiftSettings: [
                    // Opt into Swift 6 strict concurrency (approachable migration path).
                    .enableUpcomingFeature("StrictConcurrency"),
                    .define("ENABLE_SPARKLE"),
                ]),
            .executableTarget(
                name: "MyAgentsBarWidget",
                dependencies: ["MyAgentsBarCore"],
                path: "Sources/MyAgentsBarWidget",
                swiftSettings: [
                    .enableUpcomingFeature("StrictConcurrency"),
                ]),
            .executableTarget(
                name: "MyAgentsBarClaudeWebProbe",
                dependencies: ["MyAgentsBarCore"],
                path: "Sources/MyAgentsBarClaudeWebProbe",
                swiftSettings: [
                    .enableUpcomingFeature("StrictConcurrency"),
                ]),
        ])

        targets.append(.testTarget(
            name: "MyAgentsBarTests",
            dependencies: ["MyAgentsBar", "MyAgentsBarCore", "MyAgentsBarCLI", "MyAgentsBarWidget"],
            path: "Tests",
            resources: [
                .copy("MyAgentsBarTests/Fixtures"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
                .enableExperimentalFeature("SwiftTesting"),
            ]))
        #endif

        return targets
    }())
