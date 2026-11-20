import { type SchemaTypeDefinition } from "sanity";
import { educationEvent } from "./educationEvent";
import { educationImage } from "./objects/educationImage";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  educationEvent,
  // Object types
  educationImage,
];
