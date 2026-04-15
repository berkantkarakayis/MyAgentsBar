import Testing
@testable import MyAgentsBar

struct KeychainMigrationTests {
    @Test
    func `migration list covers known keychain items`() {
        let items = Set(KeychainMigration.itemsToMigrate.map(\.label))
        let expected: Set = [
            "com.steipete.MyAgentsBar:codex-cookie",
            "com.steipete.MyAgentsBar:claude-cookie",
            "com.steipete.MyAgentsBar:cursor-cookie",
            "com.steipete.MyAgentsBar:factory-cookie",
            "com.steipete.MyAgentsBar:minimax-cookie",
            "com.steipete.MyAgentsBar:minimax-api-token",
            "com.steipete.MyAgentsBar:augment-cookie",
            "com.steipete.MyAgentsBar:copilot-api-token",
            "com.steipete.MyAgentsBar:zai-api-token",
            "com.steipete.MyAgentsBar:synthetic-api-key",
        ]

        let missing = expected.subtracting(items)
        #expect(missing.isEmpty, "Missing migration entries: \(missing.sorted())")
    }
}
