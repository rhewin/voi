var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { log } from "../lib.js";
import ChatRepo from './chat.query.js';
export var chatRepo = new ChatRepo();
export var joinHandler = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var reqBody, joinReq, room, result_1, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqBody = JSON.stringify(req.body);
                log("Hit api path: ".concat(req.url, ", method: ").concat(req.method, ", data: ").concat(reqBody));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                joinReq = req.body;
                if (joinReq.room_identity == '' || joinReq.user_name == '') {
                    res.status(400).json({ error: 'make sure roomid or username is valid' });
                    return [2];
                }
                return [4, chatRepo.findRoomByRoomIdentity(joinReq.room_identity)];
            case 2:
                room = _a.sent();
                if (!(room == null)) return [3, 5];
                return [4, chatRepo.addRoom(joinReq)];
            case 3:
                if (_a.sent()) {
                    res.status(500).json({ error: 'internal error' });
                    return [2];
                }
                return [4, chatRepo.findRoomByRoomIdentity(joinReq.room_identity)];
            case 4:
                result_1 = _a.sent();
                res.json({ data: result_1, msg: 'success create & join room' });
                return [2];
            case 5:
                if (room.userName.includes(joinReq.user_name)) {
                    res.status(422).json({ error: 'user name is already taken' });
                    return [2];
                }
                room.userName.push(joinReq.user_name);
                return [4, chatRepo.editRoomByRoomIdentity(room)];
            case 6:
                if (_a.sent()) {
                    res.status(500).json({ error: 'internal error' });
                    return [2];
                }
                return [4, chatRepo.findRoomByRoomIdentity(joinReq.room_identity)];
            case 7:
                result = _a.sent();
                res.json({ data: result, msg: 'success join room' });
                return [3, 9];
            case 8:
                error_1 = _a.sent();
                next(error_1.message);
                return [3, 9];
            case 9: return [2];
        }
    });
}); };
export var leaveHandler = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var reqBody, leaveReq_1, room, updateReq, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqBody = JSON.stringify(req.body);
                log("Hit api path: ".concat(req.url, ", method: ").concat(req.method, ", data: ").concat(reqBody));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                leaveReq_1 = req.body;
                return [4, chatRepo.findRoomByRoomId(leaveReq_1.room_id)];
            case 2:
                room = _a.sent();
                if (!(room != null)) return [3, 4];
                updateReq = {
                    id: leaveReq_1.room_id,
                    userName: room.userName.filter(function (name) { return name !== leaveReq_1.user_name; }),
                };
                return [4, chatRepo.editRoomByRoomId(updateReq)];
            case 3:
                if (_a.sent()) {
                    res.status(500).json({ error: 'internal error' });
                    return [2];
                }
                _a.label = 4;
            case 4:
                res.json({ data: null, msg: 'success leave room' });
                return [3, 6];
            case 5:
                error_2 = _a.sent();
                next(error_2.message);
                return [3, 6];
            case 6: return [2];
        }
    });
}); };
export var sendChatHandler = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var reqBody, sendChatReq, room, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqBody = JSON.stringify(req.body);
                log("Hit api path: ".concat(req.url, ", method: ").concat(req.method, ", data: ").concat(reqBody));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                sendChatReq = req.body;
                if (sendChatReq.message == "") {
                    res.json({ data: null, msg: 'success send empty chat message' });
                    return [2];
                }
                return [4, chatRepo.findRoomByRoomId(sendChatReq.room_id)];
            case 2:
                room = _a.sent();
                if (room == null) {
                    res.status(422).json({ error: 'invalid room' });
                    return [2];
                }
                if (!room.userName.includes(sendChatReq.sender)) {
                    res.status(422).json({ error: 'invalid user' });
                    return [2];
                }
                return [4, chatRepo.addChat(sendChatReq)];
            case 3:
                if (_a.sent()) {
                    res.status(500).json({ error: 'internal error' });
                    return [2];
                }
                res.json({ data: null, msg: 'success send chat message' });
                return [3, 5];
            case 4:
                error_3 = _a.sent();
                next(error_3.message);
                return [3, 5];
            case 5: return [2];
        }
    });
}); };
export var listChatHandler = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var chat, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                log("Hit api path: ".concat(req.url, ", method: ").concat(req.method, ", params: ").concat(req.params.roomId));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, chatRepo.findChatByRoomId(req.params.roomId)];
            case 2:
                chat = _a.sent();
                res.json({ data: chat, msg: 'success get chat' });
                return [3, 4];
            case 3:
                error_4 = _a.sent();
                next(error_4.message);
                return [3, 4];
            case 4: return [2];
        }
    });
}); };
