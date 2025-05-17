import { TransportType } from './transportType';
import { Address } from './address';

export interface Tour {
  id: string;
  name: string;
  from: Address;
  to: Address;
  transportType: TransportType;
  distance: number;
  estimatedTime: number;
  imageUrl: string;
}
