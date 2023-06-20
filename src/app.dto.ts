// src/api.dto.ts

export class UserSemanticsDTO {
  sn: string;
  query: string;
  user_semantics: SemanticsDTO;
  query_semantics?: object;
  entity?: EntityDTO[];
}

export class SemanticsDTO {
  client_id: string;
  enterprise_id: string;
  deviceid: string;
  device_id: string;
  lang_str: string;
}

export class EntityDTO {
  text: string;
  value: string;
  tag: string;
  start_pos?: string;
}

export class ApiResponseDTO {
  status: number;
  query?: string;
  error: string;
  sn?: string;
  nlp: NlpResultDTO[];
  msg: string;
}

export class NlpResultDTO {
  domain?: string;
  english_domain: string;
  intent: string;
  action?: string;
  slots: object;
  answer: string;
  feed?: object;
  image?: ImageDTO[];
  video?: VideoDTO[];
  audio?: AudioDTO[];
  custom?: CustomDTO[];
  relate?: RelateDTO[];
  button?: ButtonDTO;
  confidence?: string;
  source?: string;
  agent?: string;
}

export class ImageDTO {
  src: string;
}

export class VideoDTO {
  src: string;
}

export class AudioDTO {
  src: string;
}

export class CustomDTO {
  type: string;
}

export class RelateDTO {
  text: string;
  score?: number;
  src?: string;
}

export class ButtonDTO {
  text: string;
  link?: string;
  source: string;
}
