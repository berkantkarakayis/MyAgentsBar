#!/usr/bin/env bash
set -euo pipefail

APP="/Applications/MyAgentsBar.app"
HELPER="$APP/Contents/Helpers/MyAgentsBarCLI"
TARGETS=("/usr/local/bin/myagentsbar" "/opt/homebrew/bin/myagentsbar")

if [[ ! -x "$HELPER" ]]; then
  echo "MyAgentsBarCLI helper not found at $HELPER. Please reinstall MyAgentsBar." >&2
  exit 1
fi

install_script=$(mktemp)
cat > "$install_script" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
HELPER="__HELPER__"
TARGETS=("/usr/local/bin/myagentsbar" "/opt/homebrew/bin/myagentsbar")

for t in "${TARGETS[@]}"; do
  mkdir -p "$(dirname "$t")"
  ln -sf "$HELPER" "$t"
  echo "Linked $t -> $HELPER"
done
EOF

perl -pi -e "s#__HELPER__#$HELPER#g" "$install_script"

osascript -e "do shell script \"bash '$install_script'\" with administrator privileges"
rm -f "$install_script"

echo "MyAgentsBar CLI installed. Try: myagentsbar usage"
