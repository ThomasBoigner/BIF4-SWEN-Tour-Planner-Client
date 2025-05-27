import { TransportType } from './transport-type';
import { Address } from './address';

export interface Tour {
    id: string;
    name: string;
    description: string;
    from: Address;
    to: Address;
    transportType: TransportType;
    distance: number;
    estimatedTime: number;
    imageUrl: string;
}
