import { List, ActionPanel, Action, Icon } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { EsgooResponse } from "../types";

interface SubUnitListProps {
  provinceId: string;
  provinceName: string;
}

export function SubUnitList({ provinceId, provinceName }: SubUnitListProps) {
  const { data, isLoading } = useFetch<EsgooResponse>(`https://esgoo.net/api-tinhthanh-new/2/${provinceId}.htm`);

  return (
    <List isLoading={isLoading} navigationTitle={`Subunits in: ${provinceName}`} searchBarPlaceholder="Search...">
      {data?.data?.map((unit) => (
        <List.Item
          key={unit.id}
          title={unit.name}
          subtitle={unit.full_name}
          icon={Icon.Building}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard title="Copy Name" content={unit.full_name} />
              <Action.CopyToClipboard title="Copy ID" content={unit.id} shortcut={{ modifiers: ["cmd"], key: "i" }} />
            </ActionPanel>
          }
        />
      ))}
      {data?.data?.length === 0 && !isLoading && <List.EmptyView title="No data found" />}
    </List>
  );
}

/* 
We just call to get Wards instead of Districts, because:
On the morning of June 12, 2025, at the 9th session, the 15th National Assembly voted 
to pass a Resolution on the arrangement of provincial-level administrative units in 2025. 
Accordingly, from the effective date of the Resolution, June 12, 2025, the whole country 
has 34 provincial-level administrative units, including 28 provinces and 6 cities. 
*/
