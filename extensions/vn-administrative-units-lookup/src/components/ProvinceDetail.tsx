import { Detail } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { AdministrativeUnit, WikipediaSummary } from "../types";
import { cleanProvinceName } from "../utils";

interface ProvinceDetailProps {
  province: AdministrativeUnit;
}

export function ProvinceDetail({ province }: ProvinceDetailProps) {
  const searchTerm = cleanProvinceName(province.name);

  const { data, isLoading } = useFetch<WikipediaSummary>(
    `https://vi.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`,
    {
      onError: (error) => {
        console.error("Wikipedia API Error:", error);
      },
    },
  );

  return (
    <Detail.Metadata>
      <Detail.Metadata.Label title="Full name" text={province.full_name} />
      <Detail.Metadata.Label title="English name" text={province.name_en} />
      <Detail.Metadata.Separator />
      <Detail.Metadata.Label title="Wikipedia Summary" />
      <Detail.Metadata.TagList title="Status">
        <Detail.Metadata.TagList.Item
          text={isLoading ? "Loading..." : "Loaded"}
          color={isLoading ? "#eed535" : "#69c646"}
        />
      </Detail.Metadata.TagList>
      {data && (
        <>
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label title="Content" />
          <Detail.Metadata.Label title="" text={data.extract} />
        </>
      )}
    </Detail.Metadata>
  );
}
