import { TransportType } from '../transport-type';
import { UpdateAddressCommand } from './update-address-command';

export interface UpdateTourCommand {
    name: string;
    description: string;
    from: UpdateAddressCommand;
    to: UpdateAddressCommand;
    transportType: TransportType;
}
