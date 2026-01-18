import { List, ActionPanel, Action, Icon } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useState } from "react";
import { EsgooResponse, WikipediaSummary } from "./types";
import { SubUnitList } from "./components/SubUnitList";
import { cleanProvinceName } from "./utils";

export default function Command() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 1. Call API to fetch list of provinces (A=1, B=0)
  const { data: provinceData, isLoading: isLoadingProvinces } = useFetch<EsgooResponse>(
    "https://esgoo.net/api-tinhthanh-new/1/0.htm",
  );

  // Separate hook to fetch Wikipedia information for the selected (highlighted) item
  const selectedProvince = provinceData?.data?.find((p) => p.id === selectedId);
  const wikiSearchTerm = selectedProvince ? cleanProvinceName(selectedProvince.name) : "";

  const { data: wikiData, isLoading: isLoadingWiki } = useFetch<WikipediaSummary>(
    `https://vi.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiSearchTerm)}`,
    {
      execute: !!wikiSearchTerm,
      keepPreviousData: true,
      headers: {
        "User-Agent": "VietnamAdministrativeUnits/1.0 (Raycast Extension; phucannguyen-dev)",
        "Api-User-Agent": "VietnamAdministrativeUnits/1.0 (Raycast Extension; phucannguyen-dev)",
      },
    },
  );

  return (
    <List
      isLoading={isLoadingProvinces}
      isShowingDetail={true}
      onSelectionChange={(id) => setSelectedId(id)}
      searchBarPlaceholder="Search for provinces..."
    >
      {provinceData?.data?.map((province) => (
        <List.Item
          key={province.id}
          id={province.id}
          title={province.name}
          icon={Icon.Globe}
          detail={
            <List.Item.Detail
              isLoading={isLoadingWiki}
              markdown={
                wikiData
                  ? `**${wikiData.title}**\n\n${wikiData.extract}\n\n![Thumbnail](${wikiData.thumbnail?.source || ""})`
                  : selectedId
                    ? "Loading Wikipedia information..."
                    : "Select a province to view information."
              }
              metadata={
                <List.Item.Detail.Metadata>
                  <List.Item.Detail.Metadata.Label title="ID" text={province.id} />
                  <List.Item.Detail.Metadata.Label title="Code" text={province.code} />
                  <List.Item.Detail.Metadata.Label title="Full name" text={province.full_name} />
                  <List.Item.Detail.Metadata.Label title="English name" text={province.name_en} />
                  {wikiData && (
                    <List.Item.Detail.Metadata.Link
                      title="Wikipedia"
                      target={wikiData.content_urls?.desktop.page || ""}
                      text="View original article"
                    />
                  )}
                </List.Item.Detail.Metadata>
              }
            />
          }
          actions={
            <ActionPanel>
              <Action.Push
                title="View Subunits"
                target={<SubUnitList provinceId={province.id} provinceName={province.name} />}
                icon={Icon.List}
              />
              {wikiData?.content_urls?.desktop.page && (
                <Action.OpenInBrowser
                  title="Open Wikipedia"
                  url={wikiData.content_urls.desktop.page}
                  shortcut={{ modifiers: ["cmd", "shift"], key: "w" }}
                />
              )}
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
