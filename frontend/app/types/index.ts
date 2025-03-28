// Material and color types
export interface Color {
  id: string;
  name: string;
  hex: string;
  addon_price: number;
}

export interface Material {
  id: string;
  name: string;
  description: string;
  properties: string[];
  base_cost_per_gram: number;
  hourly_rate: number;
  colors: Color[];
}

export interface GlobalSettings {
  support_material_multiplier: number;
  minimum_price: number;
  default_fill_density: number;
}

export interface MaterialsData {
  materials: Material[];
  global_settings: GlobalSettings;
}

// Job types
export interface ModelSize {
  x: number;
  y: number;
  z: number;
}

export interface PriceInfo {
  material_cost: number;
  time_cost: number;
  color_addon: number;
  total_price: number;
  error?: string;
}

export interface JobResult {
  success: boolean;
  filament_used_g: number;
  estimated_time: string;
  has_supports: boolean;
  size: ModelSize;
  volume_cm3: number;
  fill_density: number;
  price_info: PriceInfo;
}

export interface Job {
  id: string;
  filename: string;
  original_filename: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'approved' | 'rejected';
  created_at: number;
  material_id: string;
  color_id: string;
  fill_density: number;
  enable_supports: boolean;
  error?: string;
  result?: JobResult;
  approved_at?: number;
  rejected_at?: number;
}

// Form types
export interface PrintOptions {
  material_id: string;
  color_id: string;
  fill_density: number;
  enable_supports: boolean;
}
