"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpProvider = void 0;
const node_fetch_1 = __importStar(require("node-fetch"));
class HttpProvider {
    constructor() {
        this.pause = ms => new Promise(r => setTimeout(r, ms));
        this.headers = new node_fetch_1.Headers();
    }
    Get(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield (0, node_fetch_1.default)(url, { headers: this.headers });
            let data = yield response.json();
            if (response.status === 500) {
                for (let attempt = 1; attempt <= 3; attempt++) {
                    response = yield (0, node_fetch_1.default)(url, { headers: this.headers });
                    if (response.status === 200) {
                        data = yield response.json();
                        break;
                    }
                }
            }
            return data;
        });
    }
    Post(url, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield (0, node_fetch_1.default)(url, { headers: this.headers, method: 'POST', body: body });
            let data = yield response.json();
            console.dir(response);
            if (response.status === 500) {
                for (let attempt = 1; attempt <= 3; attempt++) {
                    response = yield (0, node_fetch_1.default)(url, { headers: this.headers, method: 'POST', body: body });
                    if (response.status === 200) {
                        data = yield response.json();
                        break;
                    }
                }
            }
            return data;
        });
    }
    AddHeader(name, value) {
        this.headers.set(name, value);
    }
}
exports.HttpProvider = HttpProvider;
