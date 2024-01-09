export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      cuisines: {
        Row: {
          id: number;
          name: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      diets: {
        Row: {
          id: number;
          name: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      locations: {
        Row: {
          coordinates: unknown | null;
          id: number;
          name: string | null;
        };
        Insert: {
          coordinates?: unknown | null;
          id: number;
          name?: string | null;
        };
        Update: {
          coordinates?: unknown | null;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      meals: {
        Row: {
          id: number;
          name: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      prices: {
        Row: {
          id: number;
          symbol: string | null;
          value: string | null;
        };
        Insert: {
          id?: number;
          symbol?: string | null;
          value?: string | null;
        };
        Update: {
          id?: number;
          symbol?: string | null;
          value?: string | null;
        };
        Relationships: [];
      };
      restaurants: {
        Row: {
          address: string | null;
          averagePrice: number[] | null;
          cuisine: number[] | null;
          description: string | null;
          diet: number[] | null;
          id: number;
          images: string[] | null;
          location: unknown | null;
          locationId: number | null;
          mainImage: string | null;
          meal: number[] | null;
          menu: string | null;
          name: string | null;
          openAt: string[] | null;
          reviews: Json | null;
          websiteUrl: string | null;
        };
        Insert: {
          address?: string | null;
          averagePrice?: number[] | null;
          cuisine?: number[] | null;
          description?: string | null;
          diet?: number[] | null;
          id?: number;
          images?: string[] | null;
          location?: unknown | null;
          locationId?: number | null;
          mainImage?: string | null;
          meal?: number[] | null;
          menu?: string | null;
          name?: string | null;
          openAt?: string[] | null;
          reviews?: Json | null;
          websiteUrl?: string | null;
        };
        Update: {
          address?: string | null;
          averagePrice?: number[] | null;
          cuisine?: number[] | null;
          description?: string | null;
          diet?: number[] | null;
          id?: number;
          images?: string[] | null;
          location?: unknown | null;
          locationId?: number | null;
          mainImage?: string | null;
          meal?: number[] | null;
          menu?: string | null;
          name?: string | null;
          openAt?: string[] | null;
          reviews?: Json | null;
          websiteUrl?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "restaurants_locationId_fkey";
            columns: ["locationId"];
            isOneToOne: false;
            referencedRelation: "locations";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      nearby_restaurants: {
        Args: {
          lat: number;
          long: number;
          cuisineFilter: number[] | null;
          dietFilter: number[] | null;
          priceFilter: number[] | null;
          mealFilter: number[] | null;
          locationparam: number;
        };
        Returns: {
          id: number;
          name: string;
          lat: number;
          long: number;
          dist_meters: number;
          reviews: Json;
          mainImage: string;
          address: string;
          averagePrice: number[];
          cuisine: number[];
          diet: number[];
        }[];
      };
      restaurants_in_view: {
        Args: {
          min_lat: number;
          min_long: number;
          max_lat: number;
          max_long: number;
        };
        Returns: {
          id: number;
          name: string;
          lat: number;
          long: number;
          reviews: Json;
          images: string[];
          address: string;
          averageprice: number[];
        }[];
      };
      get_location_data: {
        Returns: {
          id: number;
          name: string;
          lat: number;
          long: number;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;

export type Location = {
  coordinates: unknown | null;
  id: number;
  name: string | null;
};

export type LocationV2 = {
  id: number;
  name: string | null;
  lat: number;
  long: number;
};

export type Cuisine = {
  id: number;
  name: string | null;
};

export type Diet = {
  id: number;
  name: string | null;
};

export type Price = {
  id: number;
  symbol: string | null;
  value: string | null;
};

export type Meal = {
  id: number;
  name: string | null;
};

export type RestaurantReviews = {
  total: number;
  average: number;
  googleReviewsUrl: string;
  tripadvisorReviewsUrl: string;
};
export type Restaurant = {
  address: string | null;
  averagePrice: number[] | null;
  cuisine: number[] | null;
  description: string | null;
  diet: number[] | null;
  id: number;
  images: string[] | null;
  location: unknown | null;
  locationId: number | null;
  mainImage: string | null;
  meal: number[] | null;
  menu: string | null;
  name: string | null;
  openAt: string[] | null;
  reviews: RestaurantReviews | Json | null;
  websiteUrl: string | null;
  lat?: number;
  long?: number;
  dist_meters?: number;
};
