# Viet Nam Administrative Units Lookup

A Raycast extension to quickly look up administrative divisions in Vietnam (Provinces/Cities and Wards/Communes).

This extension fetches real-time data from public APIs to provide an up-to-date list of administrative units, along with summary information from Wikipedia.

## Features

- 🇻🇳 **Search Provinces & Cities**: Instantly search through all top-level administrative divisions in Vietnam.
- 📖 **Wikipedia Integration**: View a quick summary and thumbnail of the selected province directly in Raycast (fetched via Wikipedia API).
- 📂 **Sub-unit Lookup**: Drill down to view Wards and Communes (Phường/Xã) for a specific province.
- 📋 **Quick Actions**:
  - Copy Name or ID to clipboard.
  - Open the full Wikipedia article in your browser.
  - View detailed sub-divisions.

## API Sources

This extension uses the following public APIs:
- **Administrative Data**: [esgoo.net](https://esgoo.net/) (APIs for Vietnam Provinces/Wards).
- **Information**: [Wikipedia API](https://vi.wikipedia.org/api/rest_v1/) (Vietnamese content).

## Usage

1. **Search Provinces**: Open Raycast and run the command "Search Provinces".
2. **View Details**:
   - The right panel shows the full name, English name, and a Wikipedia summary.
   - **Note**: The extension automatically handles the "Thành phố Hồ Chí Minh" naming convention to fetch the correct Wikipedia data.
3. **Drill Down**: Press `Enter` on a province to see the list of its sub-units (Wards/Communes).
4. **Shortcuts**:
   - `Cmd + Shift + W`: Open Wikipedia in Browser.
   - `Cmd + I`: Copy ID.
   - `Cmd + Enter`: Copy Name.