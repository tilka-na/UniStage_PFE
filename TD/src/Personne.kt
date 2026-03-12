open abstract class Personne(private var nom:String,private var prenom:String) {
    private var id=0
    private lateinit var email:String
    protected lateinit var username:String
    companion object{
        var code=100
    }
    init {
        id=code++
        username="${prenom[0]}.${nom.lowercase().replace(" ","")}"
        email=genererEmail()
    }
    abstract fun genererEmail():String
    override fun toString(): String {
        return "N :$id \t $nom  $prenom"
    }
}