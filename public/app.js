(($) => {

    $(document).ready(() => {
        showHideSpinner(false);

        if (!hasComment()) {
            insertEmptyListMessage();
        }

        $("#send-comment").click(() =>{
            const comment = $("#comment").val();

            if (checkIfHasComment(comment)) {
                showHideSpinner(true);
                insertComment(comment)
                $("#comment").val('');
            }
        });

        $(document).on('click', '.remove', (elem) => {
            const commentId = $(elem)[0].currentTarget.id;
            removeComment(commentId);
        });

        $(document).on('click', '.play', (elem) => {
            const commentId = $(elem)[0].currentTarget.id;

            var music = new Audio(`/files/${commentId}.mp3`);
            music.play();
        });

        $("#comment").focus(() => {
            if ($("#alert")[0]) {
                $("#alert").remove();
                removeHighlightTextArea();
            }
            return;
        })

        function checkIfHasComment(comment) {
            if (comment == '') {
                insertAlertMessage();
                highlightTextArea();
                return false;
            } else {
                return true;
            }
        }

        function insertAlertMessage() {
            if (!$("#alert")[0]) {
                
                $(".form-group").before(`
                    <div id="alert" class="alert alert-danger" role="alert">
                        Por favor, digite algum comentário!
                    </div >`
                );
            }

            return;
        }

        function highlightTextArea() {
            $("#comment").addClass('border-danger');
        }

        function removeHighlightTextArea() {
            $("#comment").removeClass('border-danger');
        }

        function prepareCommentToRequest(comment) {
            return { text: comment };
        }

        function insertComment(comment) {
            const commentObject = prepareCommentToRequest(comment)

            doRequest(commentObject, "POST", "comments",
                (result) => {
                    if (result) {
                        insertTextOnCommentList(result);
                    }
                },
                (error) => {
                    console.log('error', error);
                }
            );
        }

        function insertTextOnCommentList(comment) {
            $("#comment-list").prepend(
                `<li id="comment-${comment.id}" class="list-group-item">
                    <div class="row">
                        <div class="col-sm-10">
                            ${comment.text}
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-sm btn-outline-danger col-sm-12 remove" id="${comment.id}"><i class="fas fa-times"></i></button>
                            <button type="button" class="btn btn-sm btn-outline-primary col-sm-12 play" id="${comment.id}"><i class="fas fa-volume-up"></i></button>
                        </div>
                    </div>
                </li>`);

            showHideSpinner(false);
            removeEmptyListMessage();
        }

        function removeComment(commentId) {
            doRequest(null, "DELETE", `comments/${commentId}`,
                (result) => {
                    $(`#comment-${result.id}`).remove();
                    hasComment();
                    insertEmptyListMessage();
                },
                (error) => {
                    console.log(error);
            });
        }

        function doRequest(object, method, url, successCallback, errorCallback) {
            const host = window.location.host;

            const options = {};
            options.type = method;
            options.url = `http://${host}/${url}`;

            if (object) {
                options.data = object;
            }

            $.ajax(options).done((result) => {
                successCallback(result);
            }).fail((error) => {
                errorCallback(error);
            });
        }

        function showHideSpinner(canShow) {
            if (canShow) {
                $(".lds-ripple").show();
            } else {
                $(".lds-ripple").hide();
            }
        }

        function hasComment() {
            const numComment = $('#comment-list li').length

            if (numComment == 0) {
                return false;
            }
            return true;
        }

        function insertEmptyListMessage() {
            $('#comment-list').append(`
                <p id="no-comment" class="text-center text-muted">Não há nenhum comentário cadastrado</p>
            `);
        }

        function removeEmptyListMessage() {
            $('#no-comment').remove();
        }

    });

})(jQuery);