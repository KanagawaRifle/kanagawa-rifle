import { Metadata } from "next";

import {createMetadata} from "@kanagawa-rifle/website/site";

import { info } from "./info";

export const metadata: Metadata = createMetadata(info);
