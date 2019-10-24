module.exports = function (id, nome=null, idFacebook=null) {
    /**
    * Adiciona conta à memória do processo
     * Sem retorno
     */
    const add = function() {
        if (!process.contas) {
            process.contas = []
        }
        process.contas.push(_buildConta())
    }
    /**
     * - Uso interno
     * Busca conta por id
     * Retorna o primeiro ou nulo
     * @param {*} conta_id integer
     */
    const _getContaById = function (conta_id) {
        const contas = process.contas.filter(conta => conta.id == conta_id)
        return contas.length > 0 ? contas[0] : null
    }

    /**
     * - Uso interno
     */
    function _buildConta () {
        if (!nome && id) {
            return process.contas ? _getContaById(id) : null
        }
        return {
            id,
            nome,
            idFacebook,
            add,
        }
    }


    return _buildConta()
}