/**
 * Account editor.
 *
 * @param Session
 * @param Account
 * @Page
 * @constructor
 * @ngInject
 */
function AccountEditorCtrl(Session, Account, Page) {
    Page.setTitle('-Edit Account');
    var vm = this;
    vm.data = Session.getData();
    vm.updateUser = updateUser;

    //////////////////////////////

    /**
     * Update user details
     */
    function updateUser() {
        if (vm.form.$invalid) {
            return;
        }
        Account.updateUser(vm.data)
            .then(function (response) {
                Session.setData(response);
                vm.updateMessage = 'User details updated successfully!';
            })
            .catch(function () {
                vm.updateMessage = 'Failed to update user details!';
            });
    }
}

angular
    .module("auth")
    .controller("AccountEditorCtrl", AccountEditorCtrl);
