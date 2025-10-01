package com.project.TaskNest.repo;

import com.project.TaskNest.model.Items;
import com.project.TaskNest.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ItemRepo extends JpaRepository<Items, Long> {

    @Query("SELECT i FROM Items i WHERE i.user = :user ORDER BY i.favourite DESC, i.checked ASC, i.id ASC")
    List<Items> findAllByUserOrderedByPriority(@Param("user") User user);


}