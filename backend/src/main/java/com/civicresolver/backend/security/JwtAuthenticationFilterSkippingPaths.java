package com.civicresolver.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class JwtAuthenticationFilterSkippingPaths extends OncePerRequestFilter {

    private final JwtAuthenticationFilter delegate;
    private final List<String> skipPaths;

    public JwtAuthenticationFilterSkippingPaths(JwtAuthenticationFilter delegate, List<String> skipPaths) {
        this.delegate = delegate;
        this.skipPaths = skipPaths;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();
        for (String skipPath : skipPaths) {
            if (path.startsWith(skipPath.replace("**", ""))) {
                filterChain.doFilter(request, response);
                return;
            }
        }

        // delegate JWT filter
        delegate.doFilterInternal(request, response, filterChain);
    }
}
