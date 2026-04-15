import SwiftUI

extension EnvironmentValues {
    @Entry var menuItemHighlighted: Bool = false
}

enum MenuHighlightStyle {
    static func primary(_ highlighted: Bool) -> Color {
        let theme = AppThemeRuntime.current
        return Color(nsColor: highlighted ? theme.menuSelectionTextColor : theme.menuPrimaryTextColor)
    }

    static func secondary(_ highlighted: Bool) -> Color {
        let theme = AppThemeRuntime.current
        return Color(nsColor: highlighted ? theme.menuSelectionTextColor : theme.menuSecondaryTextColor)
    }

    static func error(_ highlighted: Bool) -> Color {
        let theme = AppThemeRuntime.current
        return Color(nsColor: highlighted ? theme.menuSelectionTextColor : theme.menuErrorColor)
    }

    static func progressTrack(_ highlighted: Bool) -> Color {
        let theme = AppThemeRuntime.current
        if highlighted {
            return Color(nsColor: theme.menuSelectionTextColor).opacity(0.22)
        }
        return Color(nsColor: theme.menuProgressTrackColor)
    }

    static func progressTint(_ highlighted: Bool, fallback: Color) -> Color {
        let theme = AppThemeRuntime.current
        return highlighted ? Color(nsColor: theme.menuSelectionTextColor) : fallback
    }

    static func selectionBackground(_ highlighted: Bool) -> Color {
        let theme = AppThemeRuntime.current
        return highlighted ? Color(nsColor: theme.menuSelectionBackgroundColor) : .clear
    }
}
