export interface AdministrativeUnit {
  id: string;
  code: string;
  name: string;
  name_en: string;
  full_name: string;
  full_name_en: string;
  latitude: string;
  longitude: string;
}

export interface EsgooResponse {
  error: number;
  error_text: string;
  data_name: string;
  data: AdministrativeUnit[];
}

export interface WikipediaSummary {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  content_urls?: {
    desktop: {
      page: string;
    };
  };
}
