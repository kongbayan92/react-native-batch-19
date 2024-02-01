import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext } from "react";

const VPN_REMOTE = false
export const BASE_URL = VPN_REMOTE ? "http://id-04.tunnel.web.id:1092/api/v1" : "http://172.31.144.1:4005/api/v1"

export const TOKEN_KEY = "token";
export const TOKEN_PREFIX = "Bearer";
export const CONTEXT_APP = createContext({});
export const STORAGE = AsyncStorage