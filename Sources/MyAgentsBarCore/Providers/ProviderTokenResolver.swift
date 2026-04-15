import Foundation

public enum ProviderTokenSource: String, Sendable {
    case environment
    case authFile
}

public struct ProviderTokenResolution: Sendable {
    public let token: String
    public let source: ProviderTokenSource

    public init(token: String, source: ProviderTokenSource) {
        self.token = token
        self.source = source
    }
}

public enum ProviderTokenResolver {
    public static func zaiResolution(
        environment: [String: String] = ProcessInfo.processInfo.environment) -> ProviderTokenResolution?
    {
        self.resolveEnv(ZaiSettingsReader.apiToken(environment: environment))
    }

    public static func syntheticResolution(
        environment: [String: String] = ProcessInfo.processInfo.environment) -> ProviderTokenResolution?
    {
        self.resolveEnv(SyntheticSettingsReader.apiKey(environment: environment))
    }

    public static func copilotToken(environment: [String: String] = ProcessInfo.processInfo.environment) -> String? {
        self.copilotResolution(environment: environment)?.token
    }

    public static func copilotResolution(
        environment: [String: String] = ProcessInfo.processInfo.environment) -> ProviderTokenResolution?
    {
        self.resolveEnv(self.cleaned(environment["COPILOT_API_TOKEN"]))
    }

    public static func minimaxTokenResolution(
        environment: [String: String] = ProcessInfo.processInfo.environment) -> ProviderTokenResolution?
    {
        self.resolveEnv(MiniMaxAPISettingsReader.apiToken(environment: environment))
    }

    public static func minimaxCookieResolution(
        environment: [String: String] = ProcessInfo.processInfo.environment) -> ProviderTokenResolution?
    {
        self.resolveEnv(environment["MINIMAX_COOKIE"])
    }

    public static func alibabaTokenResolution(
        environment: [String: String] = ProcessInfo.processInfo.environment) -> ProviderTokenResolution?
    {
        self.resolveEnv(AlibabaCodingPlanSettingsReader.apiToken(environment: environment))
    }

    public static func openRouterResolution(
        environment: [String: String] = ProcessInfo.processInfo.environment) -> ProviderTokenResolution?
    {
        self.resolveEnv(OpenRouterSettingsReader.apiToken(environment: environment))
    }

    public static func warpResolution(
        environment: [String: String] = ProcessInfo.processInfo.environment) -> ProviderTokenResolution?
    {
        self.resolveEnv(WarpSettingsReader.apiKey(environment: environment))
    }

    private static func cleaned(_ raw: String?) -> String? {
        guard var value = raw?.trimmingCharacters(in: .whitespacesAndNewlines), !value.isEmpty else {
            return nil
        }

        if (value.hasPrefix("\"") && value.hasSuffix("\"")) ||
            (value.hasPrefix("'") && value.hasSuffix("'"))
        {
            value.removeFirst()
            value.removeLast()
        }

        value = value.trimmingCharacters(in: .whitespacesAndNewlines)
        return value.isEmpty ? nil : value
    }

    private static func resolveEnv(_ token: String?) -> ProviderTokenResolution? {
        guard let token else { return nil }
        return ProviderTokenResolution(token: token, source: .environment)
    }
}
