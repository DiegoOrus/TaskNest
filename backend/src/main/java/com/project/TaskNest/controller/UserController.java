package com.project.TaskNest.controller;

import com.project.TaskNest.model.User;
import com.project.TaskNest.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:5173"})
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepo userRepo;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<String, Object>> getUserProfile() {
        try {
            User currentUser = getCurrentUser();
            Map<String, Object> profile = new HashMap<>();
            profile.put("username", currentUser.getUsername());
            profile.put("email", currentUser.getEmail());
            profile.put("listTitle", currentUser.getListTitle());
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/list-title")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateListTitle(@RequestBody Map<String, String> request) {
        try {
            User currentUser = getCurrentUser();
            String newTitle = request.get("listTitle");

            if (newTitle == null || newTitle.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("List title cannot be empty");
            }

            currentUser.setListTitle(newTitle.trim());
            userRepo.save(currentUser);

            Map<String, String> response = new HashMap<>();
            response.put("listTitle", currentUser.getListTitle());
            response.put("message", "List title updated successfully");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error updating list title: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }
}