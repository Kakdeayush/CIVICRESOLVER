package com.civicresolver.backend.auth;

import com.civicresolver.backend.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private UserInfo user;

    @Data
    @AllArgsConstructor
    public static class UserInfo {
        private String name;
        private String role;
    }
}
