import java.time.LocalDate

class Enseignant(nom: String, prenom: String, val annee_entree:Int=2028) : Personne(nom, prenom ){
    private fun experience():Int{
        return LocalDate.now().year-annee_entree
    }
    override fun genererEmail(): String {
        return "$username@umi.ac.ma"
    }
    override fun toString(): String {
        return "Enseignant "+super.toString()+"\t {${experience()}} ans d'experience"
    }
}