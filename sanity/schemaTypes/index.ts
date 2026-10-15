import { collectionTypes } from "./collections";
import { localizedTypes } from "./localized";
import { pageContentType } from "./pageContent";
import { siteSettingsType } from "./siteSettings";

export const schemaTypes = [
  ...localizedTypes,
  ...collectionTypes,
  pageContentType,
  siteSettingsType,
];
