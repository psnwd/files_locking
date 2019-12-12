if (!OCA.FileLocking) {
	/**
	 * @namespace
	 */
	OCA.FileLocking = {};
}

$(document).ready( () => {

	if (!OCA.Files) {
		return;
	}
	
	// ---- Register fileactions -------

	$lockRequest = $('<d:lockinfo>', {
		'xmlns:d' : 'DAV:',
		'html' : $('<d:lockscope>', {
			'html' : '<d:exclusive/>'
		})
	});

	const lockData = "<?xml version='1.0' encoding='UTF-8'?>\n" +
		"<d:lockinfo xmlns:d='DAV:'>\n" +
		"	<d:lockscope>\n" +
		"		<d:exclusive/>\n" +
		"	</d:lockscope>\n" +
		"</d:lockinfo>\n";

	OCA.Files.fileActions.registerAction({
		name: 'lock',
		mime: 'all',
		displayName: t('extract', 'Lock file'),
		permissions: OC.PERMISSION_UPDATE,
		type: OCA.Files.FileActions.TYPE_DROPDOWN,
		iconClass: 'icon-lock-open',
		actionHandler: (filename, context) => {
			$.ajax({
				url: OC.joinPaths(OC.linkToRemoteBase('webdav'), context.dir, filename),
				method : 'LOCK',
				contentType: "text/xml",
				data : lockData
			}).done( e => {
				window.FileList.reload()
			}).fail( err => {
				console.log('error', err)
			})
		}
	});
});
