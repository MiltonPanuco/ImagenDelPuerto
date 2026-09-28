import { collectionTypes } from "./collections";
import { pageContentType } from "./pageContent";
import { siteSettingsType } from "./siteSettings";

export const schemaTypes = [...collectionTypes, pageContentType, siteSettingsType];
