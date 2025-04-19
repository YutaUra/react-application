find dist | while read -r file; do
  if [ -f "$file" ]; then
    size=$(stat -f%z "$file")  # macOS版。Linuxなら -c%s
    if [ "$size" -lt 1000 ]; then
      size_str="${size} B"
    elif [ "$size" -lt 1000000 ]; then
      size_str="$(echo "scale=1; $size / 1000" | bc) KB"
    else
      size_str="$(echo "scale=1; $size / 1000000" | bc) MB"
    fi
    echo "$file [$size_str]"
  else
    echo "$file"
  fi
done | sed -e "s/[^-][^\/]*\// |/g" -e "s/|\([^ ]\)/|-\1/"