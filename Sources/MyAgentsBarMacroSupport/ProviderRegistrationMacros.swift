@attached(peer, names: prefixed(_MyAgentsBarDescriptorRegistration_))
public macro ProviderDescriptorRegistration() = #externalMacro(
    module: "MyAgentsBarMacros",
    type: "ProviderDescriptorRegistrationMacro")

@attached(member, names: named(descriptor))
public macro ProviderDescriptorDefinition() = #externalMacro(
    module: "MyAgentsBarMacros",
    type: "ProviderDescriptorDefinitionMacro")

@attached(peer, names: prefixed(_MyAgentsBarImplementationRegistration_))
public macro ProviderImplementationRegistration() = #externalMacro(
    module: "MyAgentsBarMacros",
    type: "ProviderImplementationRegistrationMacro")
