package com.project.TaskNest.controller;

import com.project.TaskNest.model.Items;
import com.project.TaskNest.model.User;
import com.project.TaskNest.repo.ItemRepo;
import com.project.TaskNest.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173"})
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private UserRepo userRepo;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        System.out.println("Getting user with username: " + username);
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
    }

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Items>> getAllItem() {
        try {
            User currentUser = getCurrentUser();
            System.out.println("Fetching items for user: " + currentUser.getUsername());
            List<Items> items = itemRepo.findAllByUserOrderedByPriority(currentUser);
            System.out.println("Found " + items.size() + " items");
            return ResponseEntity.ok(items);
        } catch (Exception e) {
            System.err.println("Error in getAllItem: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addItem(@RequestBody Items item) {
        try {
            User currentUser = getCurrentUser();
            System.out.println("Adding item for user: " + currentUser.getUsername());
            System.out.println("Item title: " + item.getTitle());

            item.setUser(currentUser);
            System.out.println("User set on item, saving...");

            Items savedItem = itemRepo.save(item);
            System.out.println("Item saved with ID: " + savedItem.getId());

            return ResponseEntity.ok(savedItem);
        } catch (Exception e) {
            System.err.println("Error in addItem: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateItem(@PathVariable Long id, @RequestBody Items item) {
        try {
            User currentUser = getCurrentUser();
            System.out.println("Updating item " + id + " for user: " + currentUser.getUsername());

            Items currentItem = itemRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Item not found"));

            // Security check: ensure the item belongs to the current user
            if (!currentItem.getUser().getId().equals(currentUser.getId())) {
                System.err.println("Forbidden: User " + currentUser.getId() + " tried to update item owned by " + currentItem.getUser().getId());
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("You don't have permission to update this item");
            }

            currentItem.setTitle(item.getTitle());
            currentItem.setChecked(item.isChecked());
            currentItem.setFavourite(item.isFavourite());

            Items updatedItem = itemRepo.save(currentItem);
            System.out.println("Item updated successfully");
            return ResponseEntity.ok(updatedItem);
        } catch (Exception e) {
            System.err.println("Error in updateItem: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        try {
            User currentUser = getCurrentUser();
            System.out.println("Deleting item " + id + " for user: " + currentUser.getUsername());

            Items item = itemRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Item not found"));

            // Security check: ensure the item belongs to the current user
            if (!item.getUser().getId().equals(currentUser.getId())) {
                System.err.println("Forbidden: User " + currentUser.getId() + " tried to delete item owned by " + item.getUser().getId());
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("You don't have permission to delete this item");
            }

            itemRepo.deleteById(id);
            System.out.println("Item deleted successfully");
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.err.println("Error in deleteItem: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/reorder")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Items>> reorderIds() {
        try {
            User currentUser = getCurrentUser();
            List<Items> allItems = itemRepo.findAllByUserOrderedByPriority(currentUser);
            return ResponseEntity.ok(allItems);
        } catch (Exception e) {
            System.err.println("Error in reorderIds: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}