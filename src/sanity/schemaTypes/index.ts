import { type SchemaTypeDefinition } from "sanity";
import { educationEvent } from "./educationEvent";
import { educationImage } from "./objects/educationImage";
import { initiativeImage } from "./objects/initiativeImage";
import { initiativeVideo } from "./objects/initiativeVideo";
import { mediaCoverageItem } from "./objects/mediaCoverageItem";
import { healthcareEvent } from "./healthcareEvent";
import { environmentEvent } from "./environmentEvent";
import { socialWelfareEvent } from "./socialWelfareEvent";
import { disasterReliefEvent } from "./disasterReliefEvent";
import { cultureSportsEvent } from "./cultureSportsEvent";
import { teamMember } from "./teamMember";
import { advisoryBoardMember } from "./advisoryBoardMember";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents — Initiative events
  educationEvent,
  healthcareEvent,
  environmentEvent,
  socialWelfareEvent,
  disasterReliefEvent,
  cultureSportsEvent,
  // Documents — People
  teamMember,
  advisoryBoardMember,
  // Object types
  educationImage,
  initiativeImage,
  initiativeVideo,
  mediaCoverageItem,
];
