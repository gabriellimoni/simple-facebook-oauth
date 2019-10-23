module.exports = function (id, nome=null, idFacebook=null) {
    /**
    * Adiciona conta à memória do processo
     * Sem retorno
     * @param {*} conta : Conta object
     */
    const addConta = function() {
        if (!process.contas) {
            process.contas = []
        }
        process.contas.push(_buildConta())
    }
    /**
     * Busca conta por id
     * Retorns first
     * @param {*} conta_id integer
     */
    const getContaById = function (conta_id) {
        const contas = process.contas.filter(conta => conta.id == conta_id)
        return contas.length > 0 ? contas[0] : null
    }

    /**
     * Internal use
     */
    function _buildConta () {
        if (!nome && id) {
            return process.contas ? getContaById(id) : null
        }
        return {
            id,
            nome,
            idFacebook,
            addConta,
            getContaById,
        }
    }


    return _buildConta()
}