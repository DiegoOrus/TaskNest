package com.project.TaskNest.controller;

import com.project.TaskNest.model.Items;
import com.project.TaskNest.repo.ItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173"})
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemRepo itemRepo;

    @GetMapping
    public List<Items> getAllItem(){
        return itemRepo.findAllOrderedByPriority();
    }

    @PostMapping
    public Items addItem(@RequestBody Items item){
        return itemRepo.save(item);
    }

    @PutMapping("/{id}")
    public Items updateItem(@PathVariable Long id, @RequestBody Items item){
        Items currentItem = itemRepo.findById(id).orElseThrow();
        currentItem.setTitle(item.getTitle());
        currentItem.setChecked(item.isChecked());
        currentItem.setFavourite(item.isFavourite());
        return itemRepo.save(currentItem);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id){
        itemRepo.deleteById(id);
    }

    @PostMapping("/reorder")
    public List<Items> reorderIds(){
        List<Items> allItems = itemRepo.findAllOrderedByPriority();
        for(int i = 0; i < allItems.size(); i++){
            Items item = allItems.get(i);
        }
        return allItems;
    }
}