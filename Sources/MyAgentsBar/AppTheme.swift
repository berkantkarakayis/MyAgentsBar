import AppKit
import SwiftUI

enum AppTheme: String, CaseIterable, Identifiable {
    case systemDefault = "default"
    case oceanSlate
    case forestMint
    case sunsetEmber
    case graphiteLime
    case arcticBloom
    case desertSage
    case midnightRose
    case cobaltSun

    var id: String { self.rawValue }

    var label: String {
        switch self {
        case .systemDefault: "Default"
        case .oceanSlate: "Ocean Slate"
        case .forestMint: "Forest Mint"
        case .sunsetEmber: "Sunset Ember"
        case .graphiteLime: "Graphite Lime"
        case .arcticBloom: "Arctic Bloom"
        case .desertSage: "Desert Sage"
        case .midnightRose: "Midnight Rose"
        case .cobaltSun: "Cobalt Sun"
        }
    }

    var accentColor: Color {
        Color(nsColor: self.accentNSColor)
    }

    var accentNSColor: NSColor {
        self.palette?.accent ?? .controlAccentColor
    }

    var menuSelectionTextColor: NSColor {
        guard let background = self.palette?.selectionBackground else {
            return .selectedMenuItemTextColor
        }
        return Self.contrastingTextColor(for: background)
    }

    var menuPrimaryTextColor: NSColor {
        .controlTextColor
    }

    var menuSecondaryTextColor: NSColor {
        .secondaryLabelColor
    }

    var menuErrorColor: NSColor {
        .systemRed
    }

    var menuSelectionBackgroundColor: NSColor {
        self.palette?.selectionBackground ?? .selectedContentBackgroundColor
    }

    var menuProgressTrackColor: NSColor {
        self.palette?.progressTrack ?? .tertiaryLabelColor.withAlphaComponent(0.22)
    }

    var preferencesBackgroundColor: Color {
        Color(nsColor: self.palette?.preferencesBackground ?? .clear)
    }

    var switcherSelectedBackgroundColor: NSColor {
        self.palette?.accent ?? .controlAccentColor
    }

    var switcherUnselectedTextColor: NSColor {
        .secondaryLabelColor
    }

    var switcherHoverLightModeColor: NSColor {
        self.palette?.hoverLight ?? NSColor.black.withAlphaComponent(0.095)
    }

    var switcherHoverDarkModeColor: NSColor {
        self.palette?.hoverDark ?? NSColor.labelColor.withAlphaComponent(0.06)
    }

    private var palette: AppThemePalette? {
        switch self {
        case .systemDefault:
            nil
        case .oceanSlate:
            .init(
                accent: .hex(0x2563EB),
                selectionBackground: .hex(0x2C5FB4),
                progressTrack: .hex(0x5A78A8),
                preferencesBackground: .hex(0x1D3E77, alpha: 0.05),
                hoverLight: .hex(0x1E3A8A, alpha: 0.11),
                hoverDark: .hex(0x2563EB, alpha: 0.15))
        case .forestMint:
            .init(
                accent: .hex(0x2F7D62),
                selectionBackground: .hex(0x3F7A64),
                progressTrack: .hex(0x6B8F7F),
                preferencesBackground: .hex(0x2A4B3E, alpha: 0.05),
                hoverLight: .hex(0x1F4D3E, alpha: 0.11),
                hoverDark: .hex(0x2F7D62, alpha: 0.15))
        case .sunsetEmber:
            .init(
                accent: .hex(0xB45309),
                selectionBackground: .hex(0xA35A2C),
                progressTrack: .hex(0xB98A6D),
                preferencesBackground: .hex(0x68452F, alpha: 0.05),
                hoverLight: .hex(0x7A3A14, alpha: 0.11),
                hoverDark: .hex(0xB45309, alpha: 0.16))
        case .graphiteLime:
            .init(
                accent: .hex(0x6B8E23),
                selectionBackground: .hex(0x6F8940),
                progressTrack: .hex(0x88A167),
                preferencesBackground: .hex(0x33412A, alpha: 0.05),
                hoverLight: .hex(0x243041, alpha: 0.11),
                hoverDark: .hex(0x6B8E23, alpha: 0.14))
        case .arcticBloom:
            .init(
                accent: .hex(0x0E7490),
                selectionBackground: .hex(0x2B6D82),
                progressTrack: .hex(0x5C8F9E),
                preferencesBackground: .hex(0x215163, alpha: 0.05),
                hoverLight: .hex(0x164E63, alpha: 0.11),
                hoverDark: .hex(0x0E7490, alpha: 0.14))
        case .desertSage:
            .init(
                accent: .hex(0x7A8B5C),
                selectionBackground: .hex(0x7A8367),
                progressTrack: .hex(0x9AA287),
                preferencesBackground: .hex(0x5D624B, alpha: 0.05),
                hoverLight: .hex(0x5E674A, alpha: 0.11),
                hoverDark: .hex(0x7A8B5C, alpha: 0.14))
        case .midnightRose:
            .init(
                accent: .hex(0x9D4EDD),
                selectionBackground: .hex(0x7A53A8),
                progressTrack: .hex(0x8F73B0),
                preferencesBackground: .hex(0x4A3A63, alpha: 0.05),
                hoverLight: .hex(0x5A2E87, alpha: 0.12),
                hoverDark: .hex(0x9D4EDD, alpha: 0.15))
        case .cobaltSun:
            .init(
                accent: .hex(0xD4A017),
                selectionBackground: .hex(0x8A6A1F),
                progressTrack: .hex(0xA38953),
                preferencesBackground: .hex(0x5A4C2D, alpha: 0.05),
                hoverLight: .hex(0x1F4E79, alpha: 0.11),
                hoverDark: .hex(0xD4A017, alpha: 0.14))
        }
    }

    private static func contrastingTextColor(for background: NSColor) -> NSColor {
        let rgb = background.usingColorSpace(.sRGB) ?? background
        let components = rgb.cgColor.components ?? [0, 0, 0, 1]
        let r = components[0]
        let g = components.count > 1 ? components[1] : r
        let b = components.count > 2 ? components[2] : r
        // Perceived luminance (WCAG approximation)
        let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
        return luminance > 0.6 ? .black : .white
    }
}

struct AppThemePalette {
    let accent: NSColor
    let selectionBackground: NSColor
    let progressTrack: NSColor
    let preferencesBackground: NSColor
    let hoverLight: NSColor
    let hoverDark: NSColor
}

enum AppThemeRuntime {
    static let userDefaultsKey = "appTheme"

    static var current: AppTheme {
        guard
            let raw = UserDefaults.standard.string(forKey: self.userDefaultsKey),
            let theme = AppTheme(rawValue: raw)
        else {
            return .systemDefault
        }
        return theme
    }
}

extension NSColor {
    fileprivate static func hex(_ hex: UInt32, alpha: CGFloat = 1) -> NSColor {
        let red = CGFloat((hex >> 16) & 0xFF) / 255
        let green = CGFloat((hex >> 8) & 0xFF) / 255
        let blue = CGFloat(hex & 0xFF) / 255
        return NSColor(deviceRed: red, green: green, blue: blue, alpha: alpha)
    }
}
