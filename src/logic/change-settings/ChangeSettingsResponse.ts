import {ChangeSettingsStatus} from "./ChangeSettingsStatus";

export interface ChangeSettingsResponse {
    status: ChangeSettingsStatus;
    message?: string;
}

export interface ResponseListener {
    (response: ChangeSettingsResponse): void;
}