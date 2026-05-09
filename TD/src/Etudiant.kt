class Etudiant(nom: String, prenom: String,val bourse: Boolean=false):Personne(nom,prenom) {
    private fun etatBourse(): String{
        if(bourse)
            return "Boursie(e)"
        return "non Boursie(e)"
    }
    override fun genererEmail(): String {
        return "$username@edu.umi.ac.ma"
    }

    override fun toString(): String {
        return "Etudiant "+super.toString()+"\t (${etatBourse()})"
    }
}