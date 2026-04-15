import MyAgentsBarCore
import Foundation

@MainActor
extension SettingsStore {
    var kiloUsageDataSource: KiloUsageDataSource { .auto }
    var kiloExtrasEnabled: Bool { false }
    var opencodeCookieSource: ProviderCookieSource { .auto }
    var opencodegoCookieSource: ProviderCookieSource { .auto }
    var factoryCookieSource: ProviderCookieSource { .auto }
    var minimaxCookieSource: ProviderCookieSource { .auto }
    var minimaxAPIRegion: MiniMaxAPIRegion { .global }
    var kimiCookieSource: ProviderCookieSource { .auto }
    var augmentCookieSource: ProviderCookieSource { .auto }
    var ampCookieSource: ProviderCookieSource { .auto }
    var ollamaCookieSource: ProviderCookieSource { .auto }

    var zaiAPIToken: String { "" }
    var syntheticAPIToken: String { "" }
    var opencodeCookieHeader: String { "" }
    var opencodeWorkspaceID: String { "" }
    var opencodegoCookieHeader: String { "" }
    var opencodegoWorkspaceID: String { "" }
    var factoryCookieHeader: String { "" }
    var minimaxCookieHeader: String { "" }
    var minimaxAPIToken: String { "" }
    var kimiManualCookieHeader: String { "" }
    var kimiK2APIToken: String { "" }
    var kiloAPIToken: String { "" }
    var augmentCookieHeader: String { "" }
    var ampCookieHeader: String { "" }
    var ollamaCookieHeader: String { "" }
    var warpAPIToken: String { "" }

    var alibabaCodingPlanAPIRegion: AlibabaCodingPlanAPIRegion { .international }

    func ensureAlibabaProviderAutoEnabledIfNeeded() {}
}
