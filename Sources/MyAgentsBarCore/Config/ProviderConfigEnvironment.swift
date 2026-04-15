import Foundation

public enum ProviderConfigEnvironment {
    public static func applyAPIKeyOverride(
        base: [String: String],
        provider: UsageProvider,
        config: ProviderConfig?) -> [String: String]
    {
        guard let apiKey = config?.sanitizedAPIKey, !apiKey.isEmpty else { return base }
        var env = base
        switch provider {
        case .copilot:
            env["COPILOT_API_TOKEN"] = apiKey
        default:
            break
        }
        return env
    }
}
