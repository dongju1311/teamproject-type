import { create } from "zustand";
import {immer} from "zustand/middleware/immer";

interface AuthState {
    userId: string | null;
    role: string | null;
    accessToken: string | null;
    isLogin: boolean;
    authChecked: boolean;
}

interface AuthActions {
    login:(payload:{userId:string, role:string, accessToken:string}) => void;
    setAccessToken:(accessToken:string) => void;
    logout:() => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
    immer((set) => ({
    userId: null,
    role: null,
    accessToken: null,
    isLogin: false,
    authChecked: false,   // 새로고침 호출 : 로그인 상태 체크 완료 여부
    // cartCount: 0,        //  장바구니 수량

    // 🚀 로그인 성공 - 사용자아이디, 역할, 액세스토큰 정보 저장
    login: ({ userId, role, accessToken }) =>
        set((state) => {
            state.userId =userId;
            state.role=role;
            state.accessToken=accessToken;
            state.isLogin= true;
            // isHydrating: false,   // 로그인 끝났으니 확인 완료
            state.authChecked=true
        }),

    // 🔥 accessToken만 갱신할 때 사용 (refresh 용)
    setAccessToken: (accessToken) =>
        set((state) => {
            // ...state,
            // accessToken,
            state.accessToken = accessToken;
        }),

    // 🚀 로그 아웃 - 사용자아이디, 역할, 액세스토큰 정보 저장
    logout: () =>
        set((state) => {
            state.userId= null;
            state.role= null;
            state.accessToken= null;
            state.isLogin= false;
            state.authChecked= true;
        })
}))
)
