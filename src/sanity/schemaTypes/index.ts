import { type SchemaTypeDefinition } from "sanity";
import { educationEvent } from "./educationEvent";
import { educationImage } from "./objects/educationImage";
import { initiativeImage } from "./objects/initiativeImage";
import { healthcareEvent } from "./healthcareEvent";
import { environmentEvent } from "./environmentEvent";
import { socialWelfareEvent } from "./socialWelfareEvent";
import { disasterReliefEvent } from "./disasterReliefEvent";
import { cultureSportsEvent } from "./cultureSportsEvent";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  educationEvent,
  healthcareEvent,
  environmentEvent,
  socialWelfareEvent,
  disasterReliefEvent,
  cultureSportsEvent,
  // Object types
  educationImage,
  initiativeImage,
];
