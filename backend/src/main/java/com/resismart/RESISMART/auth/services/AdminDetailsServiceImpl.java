package com.resismart.RESISMART.auth.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.resismart.RESISMART.auth.AdminRepository;
import com.resismart.RESISMART.auth.models.AdminDetails;
import com.resismart.RESISMART.auth.models.ResidentDetails;
import com.resismart.RESISMART.models.Admin;
import com.resismart.RESISMART.models.Resident;
import com.resismart.RESISMART.repository.ResidentRepository;

import java.security.DrbgParameters.Reseed;
import java.util.Optional;

@Service
@Primary
public class AdminDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ResidentRepository residentRepository;

    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        Optional<Admin> admin = adminRepository.findMyUsersByUserName(userName);


         if (admin.isEmpty()) {
        Optional<Resident> resident = residentRepository.findMyUsersByUserName(userName);
        
        // Si le résident n'est pas trouvé, lancer une exception
        return resident.map(ResidentDetails::new) // Ici, il faudrait probablement une classe ResidentDetails, similaire à AdminDetails
                .orElseThrow(() -> new UsernameNotFoundException(userName + " RESIDENT  not found."));
    }



        admin.orElseThrow(() -> new UsernameNotFoundException(userName + " ADMIN IS  not found."));

        return admin.map(AdminDetails::new).get();
    }

   
 // Lire un administrateur par ID
    public Optional<Admin> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

     // Mettre à jour un administrateur
     public Admin updateAdmin(Long id, Admin updatedAdmin) {
        return adminRepository.findById(id).map(admin -> {
            admin.setFirstName(updatedAdmin.getFirstName());
            admin.setLastName(updatedAdmin.getLastName());
            admin.setTelephone(updatedAdmin.getTelephone());
            admin.setUserName(updatedAdmin.getUserName());
            admin.setPassword(updatedAdmin.getPassword());
            admin.setRoles(updatedAdmin.getRoles());
            admin.setActive(updatedAdmin.isActive());
            return adminRepository.save(admin);
        }).orElseThrow(() -> new RuntimeException("Admin non trouvé avec l'ID : " + id));
    }



        // Trouver un admin par nom d'utilisateur
        public Optional<Admin> getAdminByUserName(String userName) {
            return adminRepository.findByUserName(userName);
        }




     // Ajouter un nouvel admin
     public Admin addAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

}


