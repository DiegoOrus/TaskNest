package com.project.TaskNest.repo;

import com.project.TaskNest.model.Items;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepo extends JpaRepository<Items, Long> {
    @Query("SELECT i FROM Items i ORDER BY i.favourite DESC, i.checked ASC, i.id ASC")
    List<Items> findAllOrderedByPriority();
}
