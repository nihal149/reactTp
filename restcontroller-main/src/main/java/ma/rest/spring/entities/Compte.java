package ma.rest.spring.entities;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@JacksonXmlRootElement(localName = "compte") // Indique que cette classe peut être sérialisée en XML
public class Compte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double solde;

    @Temporal(TemporalType.DATE)
    private Date dateCreation;

    @Enumerated(EnumType.STRING)
    private TypeCompte type;


    @Projection(name = "solde", types = Compte.class)
    public interface CompteProjection1 {
        public double getSolde();
    }

    @Projection(name = "mobile", types = Compte.class)
    public interface CompteProjection2 {
        public double getSolde();
        public TypeCompte getType();
    }

    public Compte(Object o, double v, Date date, TypeCompte typeCompte) {
    }
}


