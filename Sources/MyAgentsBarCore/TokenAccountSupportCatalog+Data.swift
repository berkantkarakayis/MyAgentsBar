import Foundation

extension TokenAccountSupportCatalog {
    static let supportByProvider: [UsageProvider: TokenAccountSupport] = [
        .claude: TokenAccountSupport(
            title: "Session tokens",
            subtitle: "Store Claude sessionKey cookies or OAuth access tokens.",
            placeholder: "Paste sessionKey or OAuth token…",
            injection: .cookieHeader,
            requiresManualCookieSource: true,
            cookieName: "sessionKey"),
        .cursor: TokenAccountSupport(
            title: "Session tokens",
            subtitle: "Store multiple Cursor Cookie headers.",
            placeholder: "Cookie: …",
            injection: .cookieHeader,
            requiresManualCookieSource: true,
            cookieName: nil),
        .copilot: TokenAccountSupport(
            title: "API token",
            subtitle: "Set COPILOT_API_TOKEN for Copilot usage checks.",
            placeholder: "Paste token…",
            injection: .environment(key: "COPILOT_API_TOKEN"),
            requiresManualCookieSource: false,
            cookieName: nil),
    ]
}
