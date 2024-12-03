package ma.rest.spring.repositories;

import ma.rest.spring.entities.Compte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="comptes",collectionResourceRel = "comptes",itemResourceRel ="compte")
public interface CompteRepository extends JpaRepository<Compte, Long> {
}