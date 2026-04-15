import SwiftUI
import WidgetKit

@main
struct MyAgentsBarWidgetBundle: WidgetBundle {
    var body: some Widget {
        MyAgentsBarSwitcherWidget()
        MyAgentsBarUsageWidget()
        MyAgentsBarHistoryWidget()
        MyAgentsBarCompactWidget()
    }
}

struct MyAgentsBarSwitcherWidget: Widget {
    private let kind = "MyAgentsBarSwitcherWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(
            kind: self.kind,
            provider: MyAgentsBarSwitcherTimelineProvider())
        { entry in
            MyAgentsBarSwitcherWidgetView(entry: entry)
        }
        .configurationDisplayName("MyAgentsBar Switcher")
        .description("Usage widget with a provider switcher.")
        .supportedFamilies([.systemSmall, .systemMedium, .systemLarge])
    }
}

struct MyAgentsBarUsageWidget: Widget {
    private let kind = "MyAgentsBarUsageWidget"

    var body: some WidgetConfiguration {
        AppIntentConfiguration(
            kind: self.kind,
            intent: ProviderSelectionIntent.self,
            provider: MyAgentsBarTimelineProvider())
        { entry in
            MyAgentsBarUsageWidgetView(entry: entry)
        }
        .configurationDisplayName("MyAgentsBar Usage")
        .description("Session and weekly usage with credits and costs.")
        .supportedFamilies([.systemSmall, .systemMedium, .systemLarge])
    }
}

struct MyAgentsBarHistoryWidget: Widget {
    private let kind = "MyAgentsBarHistoryWidget"

    var body: some WidgetConfiguration {
        AppIntentConfiguration(
            kind: self.kind,
            intent: ProviderSelectionIntent.self,
            provider: MyAgentsBarTimelineProvider())
        { entry in
            MyAgentsBarHistoryWidgetView(entry: entry)
        }
        .configurationDisplayName("MyAgentsBar History")
        .description("Usage history chart with recent totals.")
        .supportedFamilies([.systemMedium, .systemLarge])
    }
}

struct MyAgentsBarCompactWidget: Widget {
    private let kind = "MyAgentsBarCompactWidget"

    var body: some WidgetConfiguration {
        AppIntentConfiguration(
            kind: self.kind,
            intent: CompactMetricSelectionIntent.self,
            provider: MyAgentsBarCompactTimelineProvider())
        { entry in
            MyAgentsBarCompactWidgetView(entry: entry)
        }
        .configurationDisplayName("MyAgentsBar Metric")
        .description("Compact widget for credits or cost.")
        .supportedFamilies([.systemSmall])
    }
}
