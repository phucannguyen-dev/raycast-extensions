/**
 * Clean province name to make Wikipedia API calls more efficient.
 * Example: "Thành phố Hà Nội" -> "Hà Nội", "Tỉnh Hà Giang" -> "Hà Giang"
 */
export function cleanProvinceName(fullName: string): string {
  // Special case: Keep "Thành phố Hồ Chí Minh" as is
  // Because if we remove "Thành phố", Wikipedia will return information about President Ho Chi Minh instead
  if (fullName === "Hồ Chí Minh") {
    return "Thành phố Hồ Chí Minh";
  }

  return fullName.replace(/^(Tỉnh|Thành phố)\s+/i, "").trim();
}
